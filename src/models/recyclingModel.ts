import { Schema, model, Document } from "mongoose";

interface ListItemDescription {
  title: string;
  item_description: string[];
}

interface ListItem {
  title: string;
  list_items: ListItemDescription[];
}

interface Content {
  description: string;
  list: ListItem[];
}

interface Section {
  title: string;
  image: string;
}

interface Details {
  section: Section;
  content: Content;
}

interface RecyclingTip extends Document {
  name: string;
  description: string;
  image: string;
  details: Details[];
}

// Esquema de Mongoose
const recyclingTipSchema = new Schema<RecyclingTip>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  details: [
    {
      section: {
        title: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
      },
      content: {
        description: {
          type: String,
          required: true,
        },
        list: [
          {
            title: {
              type: String,
              required: true,
            },
            list_items: [
              {
                title: {
                  type: String,
                  required: true,
                },
                item_description: [
                  {
                    type: String,
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
});

// Exportar el modelo
export default model<RecyclingTip>(
  "RecyclingTips",
  recyclingTipSchema,
  "recyclingtips"
);
