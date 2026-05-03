"use client";

import React, { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Background,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 50, y: 50 },
    data: { label: "Raw Brass Sourcing" },
    style: { background: "#D4AF37", color: "#fff", padding: 20 },
  },
  {
    id: "2",
    position: { x: 300, y: 150 },
    data: { label: "Precision Casting" },
    style: { background: "#F3F0E6", color: "#1a1a1a", padding: 20, border: "1px solid #D4AF37" },
  },
  {
    id: "3",
    position: { x: 100, y: 250 },
    data: { label: "Intricate Engraving" },
    style: { background: "#F3F0E6", color: "#1a1a1a", padding: 20, border: "1px solid #D4AF37" },
  },
  {
    id: "4",
    position: { x: 500, y: 250 },
    data: { label: "Hand Polishing" },
    style: { background: "#F3F0E6", color: "#1a1a1a", padding: 20, border: "1px solid #D4AF37" },
  },
  {
    id: "5",
    position: { x: 300, y: 400 },
    data: { label: "Quality Inspection" },
    style: { background: "#D4AF37", color: "#fff", padding: 20 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e3-5", source: "3", target: "5" },
  { id: "e4-5", source: "4", target: "5" },
];

export default function CraftFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background color="#D4AF37" variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

import { BackgroundVariant } from "@xyflow/react";
