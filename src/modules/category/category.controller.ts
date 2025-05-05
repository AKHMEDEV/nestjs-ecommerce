import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CheckFileSizePipe } from 'src/pipes';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() body: CreateCategoryDto,@UploadedFile( new CheckFileSizePipe(120000000)) image: Express.Multer.File,) {
    console.log(image);
    
    return this.categoryService.create(body,image);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
