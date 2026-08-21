import type { Meta, StoryObj } from "@storybook/react-vite"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Accordion defaultValue={["account"]} className="w-80">
      <AccordionItem value="account">
        <AccordionTrigger>Account details</AccordionTrigger>
        <AccordionContent>
          Email, institution, and enrollment status.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="exam">
        <AccordionTrigger>Exam context</AccordionTrigger>
        <AccordionContent>
          BIO 201 Midterm — Ch. 4-7, lockdown browser session.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
