import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UploaderModule } from './uploader/uploader.module';
import { EnvConfiguration } from './config/app.config';
@Module({
  imports: [ConfigModule.forRoot({ load: [EnvConfiguration] }), UploaderModule],
})
export class AppModule {}
