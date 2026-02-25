import { Project } from "../data/projects";

export type WindowState =
  | {
      type: "project";
      id: string;       // exe name
      project: Project;
      x: number;
      y: number;
      z: number;
    }
  | {
      type: "contact";
      id: "contact";
      x: number;
      y: number;
      z: number;
    };