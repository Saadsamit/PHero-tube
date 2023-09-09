let titleBtn = document.querySelectorAll('titleBtn')
const titlefun = async () =>{
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const titleData = await res.json()
    const title = titleData.data
    const titleContainer = document.getElementById('titleContainer')
    title.forEach(category => {
        let div = document.createElement('div')
        div.innerHTML =`<button class="btn capitalize m-2 text-[#252525B2] hover:bg-[#FF1F3D] hover:text-white titleBtn" onclick="cardfun('${category.category_id}'); colorBtn(this)">${category.category}</button>`
        titleContainer.appendChild(div)
    });
    let titleBtn = document.querySelectorAll('.titleBtn')
    titleBtn[0].classList.add('bg-[#FF1F3D]')
    titleBtn[0].classList.remove('text-[#252525B2]')
    titleBtn[0].classList.add('text-white')
}
const colorBtn = e =>{
    let titleBtn = document.querySelectorAll('.titleBtn')
    titleBtn.forEach(Btn=>{
        Btn.classList.remove('bg-[#FF1F3D]')
        Btn.classList.add('text-[#252525B2]')
        Btn.classList.remove('text-white')
    })
    e.classList.add('bg-[#FF1F3D]')
    e.classList.remove('text-[#252525B2]')
    e.classList.add('text-white')
}
const cardfun = async (id = 1000) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const titleData = await res.json()
    const title = titleData.data
    showCard(title)
    document.getElementById('sortBtn').addEventListener('click', ()=>{
        let viewsData = title.sort((a, b) => {
            let views1 = parseFloat(a.others.views)
            let views2 = parseFloat(b.others.views)
            return views2 - views1
        })
        showCard(viewsData)
    })
}
const showCard = (title)=>{
    let cardContainer = document.getElementById('cardContainer')
    cardContainer.innerHTML = ""
    let error = document.getElementById('error')
    
    if(title.length <= 0){
        error.classList.remove('hidden')
    }else{
        error.classList.add('hidden')
    }
    title.forEach(ele =>{
        let div = document.createElement('div')
        div.classList = "card sm:px-0 px-4"
        const sec = parseInt(ele.others.posted_date)
        const hour = Math.floor(sec / 3600)
        const remainingsec = Math.floor(sec % 3600)
        const min = Math.floor(remainingsec / 60)
        div.innerHTML = `
        <figure class="rounded-xl relative h-52"><img src="${ele?.thumbnail || 'no data available'}" alt="Shoes"  class="h-full w-full"/>
            <p class="text-white text-xs font-normal bg-[#171717] absolute bottom-2 right-2">${hour? hour : ''}${hour ? 'hrs' : ''} ${min ? min : ''} ${min ? 'min ago' : ''}</p>
            </figure>
            <div class="card-body p-0 pt-5">
              <div class="flex">
                <img src="${ele?.authors[0]?.profile_picture || 'no data available'}" alt="" class="h-10 w-10 rounded-full">
                <div class="flex-1 ps-3">
                  <h2 class="card-title text-[#171717] text-base font-bold">${ele?.title || 'no data available'}</h2>
                  <p class="flex items-center text-[#171717B2] text-sm font-normal">${ele?.authors[0]?.profile_name || 'no data available'} <span class="ps-3"><img src="${ele?.authors[0]?.verified ? './images/blueTick.svg' : ""}" alt=""></span></p>
                  <p class="text-[#171717B2] text-sm font-normal">${ele?.others?.views || 'no data available'} views</p>
                </div>
              </div>
            </div>
        `
        cardContainer.appendChild(div)
    })
}
titlefun()
cardfun()