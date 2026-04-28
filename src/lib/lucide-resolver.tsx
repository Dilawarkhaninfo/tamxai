"use client";

import {
  Code, Paintbrush, Brain, Cpu, TrendingUp, Stethoscope, Wrench,
  ShoppingCart, GraduationCap, LayoutGrid, Package, Zap, Rocket,
  Globe, Star, Shield, Settings, Users, FileText, Image, BarChart3,
  Briefcase, Mail, Phone, MapPin, Lock, Eye, Heart, Laptop, Code2,
  ChevronRight, ArrowUpRight, Plus, Search, Trash2, Edit2, Save, X
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Code, Paintbrush, Brain, Cpu, TrendingUp, Stethoscope, Wrench,
  ShoppingCart, GraduationCap, LayoutGrid, Package, Zap, Rocket,
  Globe, Star, Shield, Settings, Users, FileText, Image, BarChart3,
  Briefcase, Mail, Phone, MapPin, Lock, Eye, Heart, Laptop, Code2,
  ChevronRight, ArrowUpRight, Plus, Search, Trash2, Edit2, Save, X,
  // aliases
  code: Code, paintbrush: Paintbrush, brain: Brain,
};

interface IconProps extends LucideProps { name: string }

export function DynamicIcon({ name, ...props }: IconProps) {
  const Icon = ICON_MAP[name] ?? ICON_MAP[name?.toLowerCase()] ?? Package;
  return <Icon {...props} />;
}
