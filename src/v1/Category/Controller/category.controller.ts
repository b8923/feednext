import { Controller, Post, Body, HttpException, UseGuards, Param, Get, Delete, Query, Put } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger'
import { RolesGuard } from 'src/shared/Guards/roles.guard'
import { Roles } from 'src/shared/Decorators/roles.decorator'
import { CreateCategoryDto } from '../Dto/create-category.dto'
import { CategoryService } from '../Service/category.service'
import { UpdateCategoryDto } from '../Dto/update-category.dto'

@ApiUseTags('v1/category')
@Controller()
@UseGuards(RolesGuard)
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) {}

    @Get(':categoryId')
    getCategory(@Param('categoryId') categoryId: string): Promise<HttpException> {
        return this.categoryService.getCategory(categoryId)
    }

    @Get('all')
    getCategoryList(@Query() query: { limit: number, page: number, orderBy: any }): Promise<HttpException> {
        return this.categoryService.getCategoryList(query)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('create-category')
    @Roles(3)
    createCategory(@Body() dto: CreateCategoryDto): Promise<HttpException> {
        return this.categoryService.createCategory(dto)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put(':categoryId')
    @Roles(4)
    updateCategory(@Param('categoryId') categoryId: string, @Body() dto: UpdateCategoryDto): Promise<HttpException> {
        return this.categoryService.updateCategory(categoryId, dto)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete(':categoryId')
    @Roles(5)
    deleteCategory(@Param('categoryId') categoryId: string): Promise<HttpException> {
        return this.categoryService.deleteCategory(categoryId)
    }
}
