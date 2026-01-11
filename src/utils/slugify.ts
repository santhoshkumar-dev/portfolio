/**
 * Generate URL-friendly slug from title
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Generate unique slug by appending number if slug already exists
 */
export async function generateUniqueSlug(
  title: string,
  model: any,
  excludeId?: string
): Promise<string> {
  let slug = slugify(title);
  let counter = 1;
  let isUnique = false;

  while (!isUnique) {
    const query: any = { slug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const existing = await model.findOne(query);
    if (!existing) {
      isUnique = true;
    } else {
      slug = `${slugify(title)}-${counter}`;
      counter++;
    }
  }

  return slug;
}
