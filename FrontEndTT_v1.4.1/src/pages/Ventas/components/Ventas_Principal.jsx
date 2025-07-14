import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  BrowserMultiFormatReader,
  NotFoundException,
  ChecksumException,
  FormatException
} from "@zxing/library";

const Ventas_Principal = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const handleScan = (code) => {
    console.log("✅ Código detectado:", code);
    setScannedCode(code);
    setIsScanning(false);
  };

  const handleError = (error) => {
    if (
      !(error instanceof NotFoundException) &&
      !(error instanceof ChecksumException) &&
      !(error instanceof FormatException)
    ) {
      console.error("❌ Error de escaneo:", error);
      setErrorMessage("Error de escaneo: " + error.message);
    }
  };

  const restartScanning = () => {
    setScannedCode(null);
    setErrorMessage(null);
    setIsScanning(true);
  };

  useEffect(() => {
    console.log("📷 Buscando cámaras...");
    const codeReader = new BrowserMultiFormatReader();

    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        console.log("🎥 Cámaras encontradas:", videoInputDevices);
        setDevices(videoInputDevices);
        if (videoInputDevices.length > 0) {
          setSelectedDeviceId(videoInputDevices[0].deviceId);
        } else {
          setErrorMessage("No se encontraron cámaras disponibles.");
        }
      })
      .catch((err) => {
        console.error("🚫 Error al obtener dispositivos de video:", err);
        setErrorMessage("No se pudo acceder a la cámara. Verifica los permisos del navegador.");
      });
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Lector de Códigos y QR</h1>

      {devices.length > 1 && (
        <select
          onChange={(e) => setSelectedDeviceId(e.target.value)}
          value={selectedDeviceId || ""}
          style={{
            marginBottom: "10px",
            padding: "10px",
            width: "100%",
            fontSize: "16px"
          }}
        >
          {devices.map((device, index) => (
            <option key={device.deviceId} value={device.deviceId}>
              Cámara {index + 1} - {device.label || "Sin nombre"}
            </option>
          ))}
        </select>
      )}

      {isScanning ? (
        selectedDeviceId ? (
          <ScannerComponent
            onCodeDetected={handleScan}
            onError={handleError}
            deviceId={selectedDeviceId}
          />
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            🔄 Cargando cámara...
          </p>
        )
      ) : (
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              padding: "15px",
              background: "#f0f0f0",
              borderRadius: "8px",
              marginBottom: "20px"
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                wordBreak: "break-word",
                color: "black"
              }}
            >
              Código escaneado:
            </h3>
            <p
              style={{
                fontSize: "18px",
                wordBreak: "break-word",
                color: "black"
              }}
            >
              {scannedCode}
            </p>
          </div>

          <button
            onClick={restartScanning}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Escanear otro código
          </button>
        </div>
      )}

      {errorMessage && (
        <div
          style={{
            color: "red",
            marginTop: "10px",
            padding: "10px",
            background: "#ffeeee",
            borderRadius: "4px"
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Ventas_Principal;

// COMPONENTE INTERNO DE ESCANEO
function ScannerComponent({ onCodeDetected, onError, deviceId }) {
  const videoRef = useRef(null);

  useEffect(() => {
    console.log("🎯 Montando ScannerComponent con ID:", deviceId);
    const codeReader = new BrowserMultiFormatReader();

    if (!videoRef.current || !deviceId) {
      console.warn("⚠️ No se pudo montar el videoRef o no hay deviceId.");
      return;
    }

    codeReader.decodeFromVideoDevice(
      deviceId,
      videoRef.current,
      (result, error) => {
        if (result) {
          onCodeDetected(result.getText());
        }
        if (error) {
          onError(error);
        }
      }
    );

    return () => {
      console.log("🧹 Limpiando lector de cámara...");
      codeReader.reset();
    };
  }, [deviceId]);

  return (
    <div style={{ position: "relative", marginTop: "15px" }}>
      <video
        ref={videoRef}
        style={{
          width: "100%",
          border: "2px solid #333",
          borderRadius: "8px"
        }}
        autoPlay
        muted
        playsInline
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "2px",
          background: "red",
          boxShadow: "0 0 0 100vmax rgba(0,0,0,0.3)"
        }}
      ></div>
    </div>
  );
}
