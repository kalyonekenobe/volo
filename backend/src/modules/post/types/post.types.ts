export interface CreatePostRequestFiles {
  file?: Express.Multer.File[];
}

export interface UpdatePostRequestFiles {
  image?: Express.Multer.File[];
}
