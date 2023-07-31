import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 3,
    }),
  ],
  controllers: [UploaderController],
  providers: [
    UploaderService,

    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class UploaderModule {}
