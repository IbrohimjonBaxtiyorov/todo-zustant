import { LabelList, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

export default function MyPieChart({ data }) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px] max-w-full w-[250px]  [&_.recharts-text]:fill-background"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="count" />} />
        <Pie data={data} dataKey="count">
          <LabelList
            dataKey="priority"
            className="fill-background capitalize"
            stroke="none"
            fontSize={12}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
