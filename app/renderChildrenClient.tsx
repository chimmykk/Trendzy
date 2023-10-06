"use client"
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function ClientComponent({ children }: {children: ReactNode}) {
  const pathname = usePathname();

  // Conditionally set the className for the div
  const divClassName = pathname === '/startLive' ? 'lg:ml-0' : 'lg:ml-[214px]';

  return <div className={divClassName}>{children}</div>;
}
