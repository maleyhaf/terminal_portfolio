import { Project } from "../data/projects";

export type ProjectWindowState = {
  type: "project";
  id: string;
  project: Project;
  x: number;
  y: number;
  z: number;
};

export type ContactWindowState = {
  type: "contact";
  id: "contact";
  x: number;
  y: number;
  z: number;
};

export type WindowState = ProjectWindowState | ContactWindowState;