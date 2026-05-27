import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './categoryType'
import { addressType } from './addressType'
import { authorType } from './authorType'
import { blockContentType } from './blockContentType'
import { blogCategoryType } from './blogCategoryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    addressType,
    authorType,
    blockContentType,
    blogCategoryType,
  ],
}
