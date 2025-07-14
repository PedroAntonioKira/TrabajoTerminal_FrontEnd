import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useNuevoProducto = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [tipoPrecio, setTipoPrecio] = useState("bruto");
  const [puntosActivos, setPuntosActivos] = useState(false);

  const [producto, setProducto] = useState({
    nombre_Producto: "",
    marca_Producto: "",
    descripcion_Producto: "",
    categoria_Producto: "",
    proveedor_Producto: "",
    stock_Producto: "",
    precioBruto_Producto: "",
    precioNeto_Producto: "",
    costo_Producto: "",
    descuento_Producto: "0",
    iva_acreditable_Producto: "",
    iva_trasladado_Producto: "",
    estado_Producto: "",
    puntos_Producto: "0",
  });

  // Obtener categorías y proveedores al cargar
  useEffect(() => {
    if (user && user.accessToken) {
      obtenerCategoriasYProveedores();
    }
  }, [user]);

  const obtenerCategoriasYProveedores = async () => {
    try {
      setCargando(true);
      const response = await axios.post(
        "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/get-categories-proveedores",
        { uuid: user.sub },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` }
        }
      );
      setCategorias(response.data.categorias || []);
      setProveedores(response.data.proveedores || []);
    } catch (e) {
      console.error("Error al obtener categorías y proveedores", e);
      Swal.fire("Error", "No se pudo cargar la información inicial.", "error");
    } finally {
      setCargando(false);
    }
  };

  // Manejo de cambios generales
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  // Manejo de tipo de precio
  const handlePrecioBaseChange = (e) => {
    const bruto = parseFloat(e.target.value || "0");
    const iva = bruto * 0.16;
    const neto = bruto + iva;
    setProducto({
      ...producto,
      precioBruto_Producto: bruto,
      precioNeto_Producto: neto.toFixed(2),
      iva_acreditable_Producto: iva.toFixed(2)
    });
  };

  const handlePrecioNetoChange = (e) => {
    const neto = parseFloat(e.target.value || "0");
    const bruto = neto / 1.16;
    const iva = neto - bruto;
    setProducto({
      ...producto,
      precioNeto_Producto: neto,
      precioBruto_Producto: bruto.toFixed(2),
      iva_acreditable_Producto: iva.toFixed(2)
    });
  };

  // Recalcular IVA acreditable cuando cambia costo
  useEffect(() => {
    const costo = parseFloat(producto.costo_Producto || "0");
    const ivaAcreditable = costo * 0.16;
    setProducto((prev) => ({
      ...prev,
      iva_trasladado_Producto: ivaAcreditable.toFixed(2),
    }));
  }, [producto.costo_Producto]);

  // Manejo de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const ext = file.name.split(".").pop().toLowerCase();
      if (!["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
        Swal.fire("Error", "Formato de imagen no válido.", "error");
        return;
      }
      setImagen(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  // Validación general del formulario
  const validarFormulario = () => {
    const camposObligatorios = [
      "nombre_Producto",
      "descripcion_Producto",
      "categoria_Producto",
      "proveedor_Producto",
      "stock_Producto",
      "costo_Producto",
      "estado_Producto"
    ];

    for (let campo of camposObligatorios) {
      if (!producto[campo] || producto[campo].toString().trim() === "") {
        return `El campo "${campo.replaceAll("_", " ")}" es obligatorio.`;
      }
    }

    const precio = tipoPrecio === "bruto"
      ? parseFloat(producto.precioBruto_Producto)
      : parseFloat(producto.precioNeto_Producto);

    if (!precio || precio <= 0) return "El precio debe ser mayor a cero.";
    if (!imagen) return "Debes seleccionar una imagen.";
    return null;
  };

  // Crear producto
  const crearProducto = async (e) => {
    e.preventDefault();

    const error = validarFormulario();
    if (error) {
      Swal.fire("Validación", error, "warning");
      return;
    }

    try {
      setCargando(true);

      // 1. Obtener URL prefirmada
      const extension = imagen.name.split(".").pop();
      const respUrl = await axios.post(
        "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/upload_imageProducto_s3",
        { uuid: user.sub, extension },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` }
        }
      );

      const { url, path } = respUrl.data;

      // 2. Subir imagen a S3
      await axios.put(url, imagen, {
        headers: { "Content-Type": imagen.type }
      });

      // 3. Enviar producto a DynamoDB
      const body = {
        uuid: user.sub,
        ...Object.fromEntries(
            Object.entries(producto).map(([key, val]) => [key, val.toString()])
        ),
        marca_Producto: producto.marca_Producto || "Sin Información",
        descuento_Producto: producto.descuento_Producto || "0",
        puntos_Producto: puntosActivos ? producto.puntos_Producto.toString() : "0",
        url_imagen_Producto: path,
      };

      await axios.post(
        "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/register-product-dynamo",
        body,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` }
        }
      );

      Swal.fire("Éxito", "Producto creado correctamente", "success");
      navigate("/ventas/mis-productos");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo crear el producto.", "error");
    } finally {
      setCargando(false);
    }
  };

  return {
    producto,
    setProducto,
    categorias,
    proveedores,
    imagenPreview,
    tipoPrecio,
    setTipoPrecio,
    puntosActivos,
    setPuntosActivos,
    cargando,
    handleInputChange,
    handleImageChange,
    handlePrecioBaseChange,
    handlePrecioNetoChange,
    crearProducto
  };
};

export default useNuevoProducto;