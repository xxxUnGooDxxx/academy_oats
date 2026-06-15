// Явный реестр иконок из данных — чтобы в бандл не попадали все ~1500 иконок
// lucide (как было бы при `import * as Lucide`).
import {
  Phone,
  Cloud,
  PhoneForwarded,
  Calculator,
  Mic,
  Plug,
  TrendingUp,
  Bot,
  Coffee,
  Building2,
  Wrench,
  ShoppingCart,
  Stethoscope,
  Home,
  PanelTop,
  Truck,
  HeartPulse,
  Network,
  MessageSquare,
  GraduationCap,
  Circle,
} from 'lucide-react'

const ICONS = {
  Phone,
  Cloud,
  PhoneForwarded,
  Calculator,
  Mic,
  Plug,
  TrendingUp,
  Bot,
  Coffee,
  Building2,
  Wrench,
  ShoppingCart,
  Stethoscope,
  Home,
  PanelTop,
  Truck,
  HeartPulse,
  Network,
  MessageSquare,
  GraduationCap,
}

export default function Icon({ name, ...props }) {
  const Cmp = ICONS[name] || Circle
  return <Cmp {...props} />
}
