import {mockDeep,mockFn,mockReset,mockClear} from 'jest-mock-extended';
import { PrismaClient } from '../generated/prisma';
import { Attendee } from '../src/service/attendeeservice';
import { AttendeeCreate } from '../src/controller/attendeecontroller';

const prisma = mockDeep<PrismaClient>(); //Only Prisma Nested Object Mocking Purpose;


jest.mock("../src/prisma/prisma.ts",()=>({
  _esModule : true,
  default : prisma
})) //Replace Real Prisma With Mock;

describe("test",()=>{

    let attendeecreate : Attendee;

    beforeEach(()=>{
       attendeecreate = new Attendee();
       jest.clearAllMocks();   
    })
    test("test",()=>{
      prisma.attendee.create.mockResolvedValue({
        id:1,
        name : "velu",
        email : "velupvm1209@gmail.com",
        registerdAt : new Date
      })


    })
})