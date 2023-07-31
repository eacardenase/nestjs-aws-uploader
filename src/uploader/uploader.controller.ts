import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UploaderService } from './uploader.service';
import { UpdateUploaderDto } from './dto/update-uploader.dto';

@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
  }

  @Get()
  findAll() {
    return this.uploaderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploaderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUploaderDto: UpdateUploaderDto,
  ) {
    return this.uploaderService.update(+id, updateUploaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploaderService.remove(+id);
  }
}
