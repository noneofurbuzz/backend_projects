export function NoMessages(){
    return(
        <section className="flex flex-col items-center font-neue">
        <h1 className="  text-lg uppercase font-medium">No messages yet</h1>
        <p className="text-[0.95rem] leading-tight max-w-80 mx-8 text-center mt-1">Looks like no one has sent a message yet. Be the first to write a message.</p>
        <button className="bg-white text-[0.95rem] flex justify-center items-center  py-2 px-5 gap-1 mt-6 rounded-full"><span>New message</span><svg className = "rotate-45  self-end" xmlns="http://www.w3.org/2000/svg" height="20" width="12" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg></button>
        
        </section>
    )
}