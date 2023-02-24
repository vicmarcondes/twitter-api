import { Controller, Body, Patch } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('like')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Patch()
  updateLikeStatus(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

}
