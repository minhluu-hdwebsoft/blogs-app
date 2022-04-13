export interface Post {
  id?: string;
  title: string;
  html: string;
  feature_image?: string;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
  categorys: [
    {
      id: string;
      name: string;
    },
  ];
  authors: {
    id: string;
    name: string;
    email: string;
  };
}
