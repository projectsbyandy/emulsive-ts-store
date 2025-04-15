import { Locator, Page } from "@playwright/test";

export const sliderSet = async (slider: Locator, page: Page, maxValue: number, value: string) =>
{
  const percentage = (parseFloat(value) / maxValue) * 100;

  const box = await slider.boundingBox();
  if (!box) throw new Error("Bounding box is null");
  
  const targetX = box.x + (box.width * (percentage / 100));
  
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(targetX, box.y + box.height / 2);
  await page.mouse.up();  
}