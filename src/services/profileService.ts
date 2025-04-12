import { PROFILE_ENDPOINT } from '@/const/api';
import { apiRequest } from '@/utils/apiRequest';

export interface Profile {
    id: string;
    name: string;
    last_name: string;
    birthdate: string;
    email: string
    store: Store; // Un store, no un array
    createdAt: Date;
    updatedAt: Date;
}

// model User {
//     id         String   @id @default(uuid())
//     userTypeID String
//     userType   UserType @relation(fields: [userTypeID], references: [id])
//     name       String
//     last_name  String
//     birthdate  DateTime
//     email      String   @unique
//     password   String
//     status     Status   @default(ACTIVE)
  
//     stores Store[]
  
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//   }

export interface Store {
    id: string;
    name: string;
    address: string;
    tel: string;
    createdAt: Date;
    updatedAt: Date;
}

// model Store {
//     id      String @id @default(uuid())
//     name    String
//     address String
//     tel     String?
//     status  Status @default(ACTIVE)
  
//     userID String
//     user   User   @relation(fields: [userID], references: [id])
  
//     products    Product[]
//     orders      Order[]
//     dailyReport DailyReport[]
  
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//   }

export const profileService = {
    async getProfile(): Promise<Profile> {
        return apiRequest<Profile>(PROFILE_ENDPOINT);
    }
}