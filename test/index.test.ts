import {mockDeep} from 'jest-mock-extended';
import { PrismaClient } from '../generated/prisma';

export const prismamock = mockDeep<PrismaClient>(); //Only, Prisma Nested Object Mocking Purpose;

jest.mock("../src/config/prisma.ts",()=>({
  __esModule : true,
  default : prismamock
 })) //Replace Real PrismaClient With Mock;

import { Attendee } from '../src/service/attendeeservice';

describe("AttendeeTest",()=>{
    let attendee: Attendee;
    beforeEach(()=>{
       attendee = new Attendee();
       jest.clearAllMocks();   
    })
    test("AttendeeCreateTest",async()=>{

      const tests = {id :5, name : "velu",email:"veluvpm1209@gmail.com",registerdAt : new Date}

      prismamock.attendee.create.mockResolvedValue(tests)

      const test = await attendee.attendeeCreate(tests)

      expect(tests).toBe(test)
    })
    test("AttendeeFindmany" , async()=>{

      const tests = {id:1,name:"vishnu" , email:"vishnu123@gmail.com",registerdAt : new Date}

      prismamock.attendee.findMany.mockResolvedValue([tests])

      const [test] = await attendee.getattendeeList()
       
      expect(tests).toBe(test)
    })
    
})