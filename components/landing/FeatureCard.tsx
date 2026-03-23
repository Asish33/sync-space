"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="group"
    >
      <Card className="relative h-full rounded-2xl border border-white/10 bg-white/6 backdrop-blur-lg hover:shadow-[0_14px_50px_rgba(0,0,0,0.45)] transition-shadow p-6">
        <CardContent className="p-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/6 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg text-foreground mb-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
