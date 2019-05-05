export interface MessageRequestData {
  id?: string;
  maker: string;
  model: string;
  categoryId: string;
  sparePartName?: string;
  partImagePath: string;
  note?: string;
  messageCreator?: string;
}
