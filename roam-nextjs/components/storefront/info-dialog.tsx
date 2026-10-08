"use client";
import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
export type InfoTopic = "sizing" | "delivery" | "concept";
const titles: Record<InfoTopic, string> = {
  sizing: "Find your fit.",
  delivery: "Delivery & returns.",
  concept: "ROAM, reimagined.",
};
export function InfoButton({
  topic,
  children,
  className,
}: {
  topic: InfoTopic;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className={className ?? "info-button"}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="info-surface">
        <DialogHeader>
          <span className="eyebrow">GOOD TO KNOW</span>
          <DialogTitle>{titles[topic]}</DialogTitle>
          <DialogDescription>
            {topic === "sizing"
              ? "Approximate EU, UK and US conversions for this concept collection."
              : topic === "delivery"
                ? "This storefront is an interactive design prototype."
                : "A fresh perspective on everyday footwear."}
          </DialogDescription>
        </DialogHeader>
        {topic === "sizing" ? (
          <>
            <table>
              <thead>
                <tr>
                  <th scope="col">EU</th>
                  <th scope="col">UK</th>
                  <th scope="col">US men</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [38, 5, 6],
                  [39, 6, 7],
                  [40, 6.5, 7.5],
                  [41, 7, 8],
                  [42, 8, 9],
                  [43, 9, 10],
                  [44, 9.5, 10.5],
                  [45, 10.5, 11.5],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((v, i) => (
                      <td key={i}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="small-note">
              Approximate guide only. A live catalogue should supply measurements for each style,
              including women’s-specific fit information.
            </p>
          </>
        ) : topic === "delivery" ? (
          <>
            <p>
              Real delivery times, shipping prices and return policies have not been supplied. No
              orders or payments are processed in this prototype.
            </p>
            <p>
              A production store should show delivery estimates, costs and clear return conditions
              before payment.
            </p>
          </>
        ) : (
          <>
            <p>
              An independent exploration of a more distinctive ROAM storefront: expressive
              typography, editorial imagery and an easy path from discovery to a shopping bag.
            </p>
            <p>
              The four products, prices and AI-generated images are illustrative. Saved styles and
              your demo bag stay in this browser. This concept is separate from the original ROAM
              website.
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
