// FormularioProducto.jsx
// Formulario visual y validado para la creación de productos, con soporte de Bootstrap y react-icons

import React from "react";
import { FaCheck, FaImage } from "react-icons/fa";

const FormularioProducto = ({
  producto,
  setProducto,
  categorias,
  proveedores,
  imagenPreview,
  handleInputChange,
  handleImageChange,
  handlePrecioBaseChange,
  handlePrecioNetoChange,
  tipoPrecio,
  setTipoPrecio,
  puntosActivos,
  setPuntosActivos,
  crearProducto,
  cargando
}) => {
  return (
    <form className="row g-3" onSubmit={crearProducto}>
      {/* Nombre del Producto */}
      <div className="col-md-6">
        <label className="form-label">Nombre del Producto *</label>
        <input
          type="text"
          className="form-control"
          name="nombre_Producto"
          maxLength={30}
          value={producto.nombre_Producto}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Marca (opcional) */}
      <div className="col-md-6">
        <label className="form-label">Marca (opcional)</label>
        <input
          type="text"
          className="form-control"
          name="marca_Producto"
          maxLength={25}
          value={producto.marca_Producto}
          onChange={handleInputChange}
        />
      </div>

      {/* Descripción */}
      <div className="col-12">
        <label className="form-label">Descripción *</label>
        <textarea
          className="form-control"
          name="descripcion_Producto"
          rows={3}
          maxLength={100}
          value={producto.descripcion_Producto}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>

      {/* Categoría */}
      <div className="col-md-6">
        <label className="form-label">Categoría *</label>
        <select
          className="form-select"
          name="categoria_Producto"
          value={producto.categoria_Producto}
          onChange={handleInputChange}
          required
        >
          <option value="">Seleccione una categoría</option>
          <option value="Sin Información">Sin Información</option>
          {categorias.map((cat) => (
            <option key={cat.id_categoria} value={cat.nombre_categoria}>
              {cat.nombre_categoria}
            </option>
          ))}
        </select>
      </div>

      {/* Proveedor */}
      <div className="col-md-6">
        <label className="form-label">Proveedor *</label>
        <select
          className="form-select"
          name="proveedor_Producto"
          value={producto.proveedor_Producto}
          onChange={handleInputChange}
          required
        >
          <option value="">Seleccione un proveedor</option>
          <option value="Sin Información">Sin Información</option>
          {proveedores.map((prov) => (
            <option key={prov.id_Proveedor} value={prov.nombre_proveedor}>
              {prov.nombre_proveedor}
            </option>
          ))}
        </select>
      </div>

      {/* Tipo de Precio */}
      <div className="col-md-6">
        <label className="form-label">Tipo de Precio *</label>
        <select
          className="form-select"
          value={tipoPrecio}
          onChange={(e) => setTipoPrecio(e.target.value)}
          required
        >
          <option value="">Selecciona el tipo de precio</option>
          <option value="bruto">Precio Bruto</option>
          <option value="neto">Precio Neto</option>
        </select>
      </div>

      {/* Precio Bruto */}
      <div className="col-md-6">
        <label className="form-label">Precio Bruto</label>
        <input
          type="number"
          className="form-control"
          name="precioBruto_Producto"
          min={0}
          value={producto.precioBruto_Producto}
          onChange={handlePrecioBaseChange}
          disabled={tipoPrecio !== "bruto"}
        />
      </div>

      {/* Precio Neto */}
      <div className="col-md-6">
        <label className="form-label">Precio Neto</label>
        <input
          type="number"
          className="form-control"
          name="precioNeto_Producto"
          min={0}
          value={producto.precioNeto_Producto}
          onChange={handlePrecioNetoChange}
          disabled={tipoPrecio !== "neto"}
        />
      </div>

      {/* Costo */}
      <div className="col-md-6">
        <label className="form-label">Costo *</label>
        <input
          type="number"
          className="form-control"
          name="costo_Producto"
          min={0}
          value={producto.costo_Producto}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* IVA Acreditable y Trasladado */}
      <div className="col-md-6">
        <label className="form-label">IVA Acreditable</label>
        <input
          type="text"
          className="form-control"
          value={producto.iva_acreditable_Producto}
          readOnly
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">IVA Trasladado</label>
        <input
          type="text"
          className="form-control"
          value={producto.iva_trasladado_Producto}
          readOnly
        />
      </div>

      {/* Descuento */}
      <div className="col-md-6">
        <label className="form-label">Descuento (%)</label>
        <input
          type="number"
          className="form-control"
          name="descuento_Producto"
          min={0}
          value={producto.descuento_Producto}
          onChange={handleInputChange}
        />
      </div>

      {/* Stock */}
      <div className="col-md-6">
        <label className="form-label">Stock *</label>
        <input
          type="number"
          className="form-control"
          name="stock_Producto"
          min={0}
          value={producto.stock_Producto}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Estado */}
      <div className="col-md-6">
        <label className="form-label">Estado *</label>
        <select
          className="form-select"
          name="estado_Producto"
          value={producto.estado_Producto}
          onChange={handleInputChange}
          required
        >
          <option value="">Selecciona estado</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      {/* Puntos */}
      <div className="col-md-6 form-check mt-4">
        <input
          className="form-check-input"
          type="checkbox"
          id="puntosCheck"
          checked={puntosActivos}
          onChange={() => {
            setPuntosActivos(!puntosActivos);
            if (puntosActivos) {
              setProducto((prev) => ({ ...prev, puntos_Producto: "0" }));
            }
          }}
        />
        <label className="form-check-label" htmlFor="puntosCheck">
          Activar puntos
        </label>
        {puntosActivos && (
          <input
            type="number"
            className="form-control mt-2"
            name="puntos_Producto"
            min={1}
            value={producto.puntos_Producto}
            onChange={handleInputChange}
          />
        )}
      </div>

      {/* Imagen */}
      <div className="col-md-6">
        <label className="form-label">
          Imagen del producto <FaImage className="ms-1" />
        </label>
        <input
          type="file"
          className="form-control"
          accept=".png,.jpg,.jpeg,.gif,.webp,.svg"
          onChange={handleImageChange}
          required
        />
        {imagenPreview && (
          <img
            src={imagenPreview}
            alt="Vista previa"
            className="img-thumbnail mt-2"
            style={{ maxHeight: "200px" }}
          />
        )}
      </div>

      {/* Botón */}
      <div className="col-12 text-center mt-4">
        <button type="submit" className="btn btn-success" disabled={cargando}>
          <FaCheck className="me-2" /> {cargando ? "Creando..." : "Crear Producto"}
        </button>
      </div>
    </form>
  );
};

export default FormularioProducto;

