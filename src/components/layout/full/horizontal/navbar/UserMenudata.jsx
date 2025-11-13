import {
  IconHome,
  IconTrendingUp,
  IconClipboardText,
  IconUserCircle,
  IconApiApp,
  IconNotes,
} from '@tabler/icons-react';
import uniqueId from 'lodash/uniqueId';

const UserMenuItems = [
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconHome,
    href: '/user/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Trade Panel',
    icon: IconTrendingUp,
    href: '/user/trade-panel',
  },
  {
    id: uniqueId(),
    title: 'Marketplace',
    icon: IconClipboardText,
    href: '/user/marketplace',
  },
  {
    id: uniqueId(),
    title: 'API Details',
    icon: IconApiApp,
    href: '/user/api-details',
  },
  {
    id: uniqueId(),
    title: 'Order History',
    icon: IconNotes,
    href: '/user/order-history',
  },
    {
      id: uniqueId(),
      title: 'Startegy Info',
      icon: IconNotes,
      href: '/user/strategy-info',
    },
      {
      id: uniqueId(),
      title: 'Trade Info',
      icon: IconNotes,
      href: '/user/trade-info',
    },
      {
      id: uniqueId(),
      title: 'Plan & Bill',
      icon: IconNotes,
      href: '/user/plan-info',
    },
  {
    id: uniqueId(),
    title: 'Profile',
    icon: IconUserCircle,
    href: '/user/profile',
  },
];

export default UserMenuItems;
