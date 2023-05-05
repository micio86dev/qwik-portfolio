export interface InputTextProps {
  label?: string;
  name: string;
  placeholder?: string;
  class?: string;
  type?: string;
  value?: any;
  required?: boolean;
  "on-input"?: any;
}

export interface New {
  id: string;
  slug: string;
  title: string;
  content: string;
  description: string;
  date: Date;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  url: string;
  content: string;
  description: string;
}

export interface Contact {
  id: string;
  email: string;
  text: string;
}

export interface Customer {
  id: string;
  slug: string;
  name: string;
  url: string;
  content: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
}

export interface Text {
  id: string;
  name: string;
  text: string;
}
