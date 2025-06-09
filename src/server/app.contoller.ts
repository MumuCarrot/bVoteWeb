import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Renderer, RenderService } from 'nest-next';

@Controller('*')
export class AppController {
    constructor(private readonly renderService: RenderService) {}

    @Get()
    async renderPage(@Req() req, @Res() res) {
        let render: Renderer | undefined = this.renderService.getRenderer();
        if (!render) {
            throw new Error('RenderService not initialized')
        }
        return render(req, res, '/');
    }
}
