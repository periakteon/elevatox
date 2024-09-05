import {
  ClipboardEdit,
  ClipboardList,
  Edit,
  FilePlus,
  HandCoins,
  Landmark,
  QrCode,
  ScrollText,
  Settings,
  Trash2,
  UserPlus,
  UserX,
  Wallet,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  icon?: React.ReactNode;
}

interface SearchBarConfig {
  company: NavItem[];
  staff: NavItem[];
  buildingResponsiblePerson: NavItem[];
  elevator: NavItem[];
  maintenance: NavItem[];
  payment: NavItem[];
}

export const searchBarConfig: SearchBarConfig = {
  company: [
    {
      title: "Firma Bilgilerini Düzenle",
      href: "/firma/duzenle",
      icon: <Settings />,
    },
  ],
  staff: [
    {
      title: "Personel Listesi",
      href: "/personel",
      icon: <ScrollText />,
    },
    {
      title: "Personel Ekle",
      href: "/personel/ekle",
      icon: <UserPlus />,
    },
    {
      title: "Personel Sil",
      href: "/personel/sil",
      icon: <UserX />,
    },
    {
      title: "Personel Düzenle",
      href: "/personel/duzenle",
      icon: <Edit />,
    },
  ],
  buildingResponsiblePerson: [
    {
      title: "Bina Sorumlusu Listesi",
      href: "/bina-sorumlulari",
      icon: <ScrollText />,
    },
    {
      title: "Bina Sorumlusu Ekle",
      href: "/bina-sorumlulari/ekle",
      icon: <UserPlus />,
    },
    {
      title: "Bina Sorumlusu Sil",
      href: "/bina-sorumlulari/sil",
      icon: <UserX />,
    },
    {
      title: "Bina Sorumlusu Düzenle",
      href: "/bina-sorumlulari/duzenle",
      icon: <Edit />,
    },
  ],
  elevator: [
    {
      title: "Asansör Listesi",
      href: "/asansor",
      icon: <ClipboardList />,
    },
    {
      title: "Asansör Ekle",
      href: "/asansor/ekle",
      icon: <FilePlus />,
    },
    {
      title: "Asansör Sil",
      href: "/asansor/sil",
      icon: <Trash2 />,
    },
    {
      title: "Asansör Düzenle",
      href: "/asansor/duzenle",
      icon: <ClipboardEdit />,
    },
  ],
  maintenance: [
    {
      title: "Bakım Listesi",
      href: "/bakim",
      icon: <ClipboardList />,
    },
    {
      title: "Bakım Ekle",
      href: "/bakim/ekle",
      icon: <FilePlus />,
    },
    {
      title: "QR Kod Görüntüle",
      href: "/bakim/qr",
      icon: <QrCode />,
    },
    {
      title: "Bakım Sil",
      href: "/bakim/sil",
      icon: <Trash2 />,
    },
    {
      title: "Bakım Düzenle",
      href: "/bakim/duzenle",
      icon: <ClipboardEdit />,
    },
  ],
  payment: [
    {
      title: "Tahsilat Listesi",
      href: "/tahsilat",
      icon: <Landmark />,
    },
    {
      title: "Tahsilat Ekle",
      href: "/tahsilat/ekle",
      icon: <HandCoins />,
    },
    {
      title: "Tahsilat Sil",
      href: "/tahsilat/sil",
      icon: <Trash2 />,
    },
    {
      title: "Tahsilat Düzenle",
      href: "/tahsilat/duzenle",
      icon: <Wallet />,
    },
  ],
};
