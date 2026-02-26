import { Project } from "../data/projects";

export type ProjectWindowState = {
  type: "project";
  id: string;
  project: Project;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
};

export type ContactWindowState = {
  type: "contact";
  id: "contact";
  x: number;
  y: number;
  z: number;
  minimized: boolean;
};

export type AboutWindowState = {
  type: "about";
  id: "about";
  x: number;
  y: number;
  z: number;
  minimized: boolean;
};

export type WindowState = ProjectWindowState | ContactWindowState | AboutWindowState;