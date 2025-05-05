import {
    ArgumentMetadata,
    ConflictException,
    Injectable,
    PipeTransform,
  } from '@nestjs/common';
  
  @Injectable()
  export class CheckFileSizePipe implements PipeTransform {
    limit: number;
  
    constructor(limit: number) {
      this.limit = limit;
    }
  
    transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
      if (value.size > this.limit) {
        throw new ConflictException(
          `File o'lchami ${this.limit} KB dan kichik bolishi kerak`,
        );
      }else{
        return value
      }
      return value;
    }
  }
  