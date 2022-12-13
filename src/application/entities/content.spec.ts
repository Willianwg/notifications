import { Content } from "./content"

describe("Notification content", ()=>{
    it("Should be able to create a notification content", ()=>{
        const content = new Content("You have a new friend request!");
    
        expect(content).toBeTruthy();
        expect(content.value).toBe("You have a new friend request!");
    })
    
    it("Should not be able to create a notification content with less than 5 characters", ()=>{
    
        expect(()=> new Content("yes")).toThrow();
    })
    
    it("Should not be able to create a notification content with more than 240 characters", ()=>{
    
        expect(()=> new Content("a".repeat(241))).toThrow();
    })
})
