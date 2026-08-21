import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export interface TrendSeries {
  key: string
  label: string
  color: string
  /** Slightly thicker/bolder line — used for a "total" series among breakdowns. */
  emphasis?: boolean
}

interface TrendChartProps {
  categories: string[]
  series: TrendSeries[]
  values: Record<string, number[]>
  showLegend?: boolean
  height?: number
}

function TrendChart({ categories, series, values, showLegend = false, height = 220 }: TrendChartProps) {
  const data = categories.map((label, i) => {
    const row: Record<string, string | number> = { label }
    for (const s of series) row[s.key] = values[s.key][i]
    return row
  })

  const config: ChartConfig = Object.fromEntries(
    series.map((s) => [s.key, { label: s.label, color: s.color }])
  )

  return (
    <ChartContainer config={config} className="aspect-auto w-full" style={{ height }}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 5" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          fontSize={12}
          stroke="var(--muted-foreground)"
        />
        <YAxis tickLine={false} axisLine={false} tickCount={3} fontSize={12} stroke="var(--muted-foreground)" width={36} />
        <ChartTooltip content={<ChartTooltipContent labelKey="label" />} />
        {series.map((s) => (
          <Line
            key={s.key}
            dataKey={s.key}
            type="monotone"
            stroke={s.color}
            strokeWidth={s.emphasis ? 2.5 : 2}
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive
          />
        ))}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
      </LineChart>
    </ChartContainer>
  )
}

export { TrendChart }
