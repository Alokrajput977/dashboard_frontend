import React, { useRef, useState, useEffect } from "react";
import {
  Square,
  Pen,
  Hand,
  Eraser,
  ArrowRight,
  ArrowLeft,
  Circle,
  Image as ImageIcon,
  Type as TypeIcon
} from "lucide-react";

import "./ExcalidrawCanvas.css";

const BUTTONS = [
  { Icon: Square, label: "Box", tool: "box", cursor: "crosshair" },
  { Icon: Pen, label: "Pencil", tool: "pencil", cursor: "url('/cursors/pencil.svg'), auto" },
  { Icon: Hand, label: "Hand", tool: "hand", cursor: "grab" },
  { Icon: Eraser, label: "Eraser", tool: "eraser", cursor: "url('/cursors/eraser.svg'), auto" },
  { Icon: ArrowRight, label: "Arrow Right", tool: "arrow-right", cursor: "crosshair" },
  { Icon: ArrowLeft, label: "Arrow Left", tool: "arrow-left", cursor: "crosshair" },
  { Icon: Circle, label: "Circle", tool: "circle", cursor: "crosshair" },
  { Icon: ImageIcon, label: "Image", tool: "image", cursor: "pointer" },
  { Icon: TypeIcon, label: "Text", tool: "text", cursor: "text" },
];

export default function ExcalidrawCanvas() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [selectedTool, setSelectedTool] = useState("box");
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [paths, setPaths] = useState([]);
  const [dragInfo, setDragInfo] = useState(null);
  const [textInput, setTextInput] = useState({ visible: false, x: 0, y: 0, value: "" });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    paths.forEach((path) => {
      ctx.strokeStyle = "#7c3aed";
      ctx.fillStyle = "#7c3aed";
      ctx.lineWidth = 2;

      if (path.tool === "box") {
        ctx.beginPath();
        ctx.rect(path.x, path.y, path.w, path.h);
        ctx.stroke();
      }

      if (path.tool === "circle") {
        ctx.beginPath();
        ctx.ellipse(
          path.cx,
          path.cy,
          Math.abs(path.rx),
          Math.abs(path.ry),
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      if (path.tool === "pencil") {
        ctx.beginPath();
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y);
        }
        ctx.stroke();
      }

      if (path.tool.startsWith("arrow")) {
        drawArrow(ctx, path.startX, path.startY, path.endX, path.endY);
      }

      if (path.tool === "uploaded-image" && path.image) {
        ctx.drawImage(path.image, path.x, path.y, path.w, path.h);
      }

      if (path.tool === "text") {
        ctx.font = "20px Arial";
        ctx.fillText(path.text, path.x, path.y);
      }
    });
  }, [paths]);

  const drawArrow = (ctx, x1, y1, x2, y2) => {
    const headlen = 10;
    const angle = Math.atan2(y2 - y1, x2 - x1);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
    ctx.lineTo(x2, y2);
    ctx.fillStyle = "#7c3aed";
    ctx.fill();
  };

  const getCursor = () => {
    const found = BUTTONS.find((btn) => btn.tool === selectedTool);
    return found?.cursor || "default";
  };

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleMouseDown = (e) => {
    const { x, y } = getCanvasCoords(e);

    if (selectedTool === "image") {
      fileInputRef.current.click();
      return;
    }

    if (["box", "circle", "arrow-right", "arrow-left"].includes(selectedTool)) {
      setStartPos({ x, y });
    } else if (selectedTool === "pencil") {
      setPaths((prev) => [...prev, { tool: "pencil", points: [{ x, y }] }]);
      setIsDrawing(true);
    } else if (selectedTool === "eraser") {
      eraseAtPoint(x, y);
    } else if (selectedTool === "hand") {
      const idx = paths.findIndex((shape) => isPointOnShape(shape, x, y));
      if (idx !== -1) {
        const shape = paths[idx];
        if (shape.tool === "box" || shape.tool === "uploaded-image" || shape.tool === "text") {
          setDragInfo({ idx, offsetX: x - shape.x, offsetY: y - shape.y });
        } else if (shape.tool === "circle") {
          setDragInfo({ idx, offsetX: x - shape.cx, offsetY: y - shape.cy });
        } else if (shape.tool.startsWith("arrow")) {
          setDragInfo({ idx, offsetX: x - shape.startX, offsetY: y - shape.startY, dx: shape.endX - shape.startX, dy: shape.endY - shape.startY });
        } else if (shape.tool === "pencil") {
          const dx = x - shape.points[0].x;
          const dy = y - shape.points[0].y;
          setDragInfo({ idx, dx, dy });
        }
      }
    }
  };

  const handleMouseMove = (e) => {
    const { x, y } = getCanvasCoords(e);

    if (selectedTool === "pencil" && isDrawing) {
      setPaths((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].points.push({ x, y });
        return updated;
      });
    } else if (selectedTool === "hand" && dragInfo) {
      setPaths((prev) => {
        const updated = [...prev];
        const shape = updated[dragInfo.idx];
        if (shape.tool === "box" || shape.tool === "uploaded-image" || shape.tool === "text") {
          shape.x = x - dragInfo.offsetX;
          shape.y = y - dragInfo.offsetY;
        } else if (shape.tool === "circle") {
          shape.cx = x - dragInfo.offsetX;
          shape.cy = y - dragInfo.offsetY;
        } else if (shape.tool.startsWith("arrow")) {
          shape.startX = x - dragInfo.offsetX;
          shape.startY = y - dragInfo.offsetY;
          shape.endX = shape.startX + dragInfo.dx;
          shape.endY = shape.startY + dragInfo.dy;
        } else if (shape.tool === "pencil") {
          const dx = x - shape.points[0].x;
          const dy = y - shape.points[0].y;
          const offsetX = dx - dragInfo.dx;
          const offsetY = dy - dragInfo.dy;
          shape.points = shape.points.map((pt) => ({
            x: pt.x + offsetX,
            y: pt.y + offsetY,
          }));
        }
        return updated;
      });
    }
  };

  const handleMouseUp = (e) => {
    const { x, y } = getCanvasCoords(e);

    if (selectedTool === "box" && startPos) {
      setPaths((prev) => [
        ...prev,
        { tool: "box", x: startPos.x, y: startPos.y, w: x - startPos.x, h: y - startPos.y },
      ]);
      setStartPos(null);
    } else if (selectedTool === "circle" && startPos) {
      setPaths((prev) => [
        ...prev,
        { tool: "circle", cx: (startPos.x + x) / 2, cy: (startPos.y + y) / 2, rx: (x - startPos.x) / 2, ry: (y - startPos.y) / 2 },
      ]);
      setStartPos(null);
    } else if (selectedTool.startsWith("arrow") && startPos) {
      setPaths((prev) => [
        ...prev,
        { tool: selectedTool, startX: startPos.x, startY: startPos.y, endX: x, endY: y },
      ]);
      setStartPos(null);
    } else if (selectedTool === "pencil") {
      setIsDrawing(false);
    } else if (selectedTool === "hand") {
      setDragInfo(null);
    }
  };

  const handleDoubleClick = (e) => {
    if (selectedTool !== "text") return;
    const { x, y } = getCanvasCoords(e);
    setTextInput({ visible: true, x, y, value: "" });
  };

  const handleTextInputChange = (e) => {
    setTextInput((prev) => ({ ...prev, value: e.target.value }));
  };

  const handleTextInputKeyDown = (e) => {
    if (e.key === "Enter" && textInput.value.trim() !== "") {
      setPaths((prev) => [
        ...prev,
        { tool: "text", x: textInput.x, y: textInput.y, text: textInput.value.trim() },
      ]);
      setTextInput({ visible: false, x: 0, y: 0, value: "" });
    }
  };

  const eraseAtPoint = (x, y) => {
    const radius = 10;
    setPaths((prev) =>
      prev.filter((shape) => !isPointOnShape(shape, x, y, radius))
    );
  };

  const isPointOnShape = (shape, x, y, radius = 10) => {
    if (shape.tool === "box" || shape.tool === "uploaded-image" || shape.tool === "text") {
      return x >= shape.x && x <= shape.x + (shape.w || 100) && y >= shape.y - 20 && y <= shape.y;
    }
    if (shape.tool === "circle") {
      return Math.abs(x - shape.cx) <= Math.abs(shape.rx) && Math.abs(y - shape.cy) <= Math.abs(shape.ry);
    }
    if (shape.tool.startsWith("arrow")) {
      return pointToLineDistance(x, y, shape.startX, shape.startY, shape.endX, shape.endY) < radius;
    }
    if (shape.tool === "pencil") {
      return shape.points.some((pt) => Math.hypot(pt.x - x, pt.y - y) < radius);
    }
    return false;
  };

  const pointToLineDistance = (px, py, x1, y1, x2, y2) => {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    if (len_sq !== 0) param = dot / len_sq;
    let xx, yy;
    if (param < 0) { xx = x1; yy = y1; }
    else if (param > 1) { xx = x2; yy = y2; }
    else { xx = x1 + param * C; yy = y1 + param * D; }
    return Math.hypot(px - xx, py - yy);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      setPaths((prev) => [
        ...prev,
        { tool: "uploaded-image", x: 100, y: 100, w: 200, h: 200, image: img },
      ]);
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="draw-container">
      <div className="excalidraw-toolbar">
        {BUTTONS.map(({ Icon, label, tool }, idx) => (
          <button
            key={idx}
            className={`toolbar-button ${selectedTool === tool ? "active" : ""}`}
            title={label}
            onClick={() => setSelectedTool(tool)}
          >
            <Icon className="toolbar-icon" size={28} />
          </button>
        ))}
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          width={1000}
          height={800}
          className="draw-canvas"
          style={{ cursor: getCursor() }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onDoubleClick={handleDoubleClick}
        />
        {textInput.visible && (
          <input
            className="text-input-overlay"
            style={{
              position: "absolute",
              left: textInput.x,
              top: textInput.y - 20,
            }}
            value={textInput.value}
            onChange={handleTextInputChange}
            onKeyDown={handleTextInputKeyDown}
            autoFocus
          />
        )}
      </div>
    </div>
  );
}
