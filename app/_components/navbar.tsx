"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";

interface NavbarProps {
  isAdmin: boolean;
}

const Navbar = ({ isAdmin }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex hidden justify-between border-b border-solid px-8 py-4 min-[900px]:block">
        <div className="flex items-center gap-10">
          <Image src="/logo.svg" alt="Finance AI" width={173} height={39} />
          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={
              pathname === "/transactions"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Transações
          </Link>
          {isAdmin ? (
            <>
              <Link
                href="/orders"
                className={
                  pathname === "/orders"
                    ? "font-bold text-primary"
                    : "text-muted-foreground"
                }
              >
                Pedidos
              </Link>
              <Link
                href="/products"
                className={
                  pathname === "/products"
                    ? "font-bold text-primary"
                    : "text-muted-foreground"
                }
              >
                Produtos
              </Link>
            </>
          ) : (
            <Link
              href="/subscriptions"
              className={
                pathname === "/subscriptions"
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
              }
            >
              Assinatura
            </Link>
          )}
        </div>
        <UserButton showName />
      </nav>
      <nav className="block justify-between space-y-4 border-b border-solid py-4 min-[900px]:hidden">
        <div className="flex items-center justify-between px-8">
          <Image src="/logo.svg" alt="Finance AI" width={173} height={39} />
          <UserButton showName />
        </div>
        <Separator className="w-full" />
        <div className="flex justify-between px-4">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={
              pathname === "/transactions"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Transações
          </Link>
          {isAdmin ? (
            <>
              <Link
                href="/orders"
                className={
                  pathname === "/orders"
                    ? "font-bold text-primary"
                    : "text-muted-foreground"
                }
              >
                Pedidos
              </Link>
              <Link
                href="/products"
                className={
                  pathname === "/products"
                    ? "font-bold text-primary"
                    : "text-muted-foreground"
                }
              >
                Produtos
              </Link>
            </>
          ) : (
            <Link
              href="/subscriptions"
              className={
                pathname === "/subscriptions"
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
              }
            >
              Assinatura
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
