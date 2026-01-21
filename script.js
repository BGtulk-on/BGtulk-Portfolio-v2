tailwind.config = {
    theme: {
        extend: {
            colors: {
                'main-black': '#000000',
                'acscent': '#f5deb3',
                'popp': '#f16a50',
            },
            fontFamily: {
                'sans': ['Switzer', 'sans-serif'],

            }
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {

    var main_tl = gsap.timeline()

    main_tl.from(".vertical-text", {
        y: 100,
        opacity: 0,
        duartion: 1.5,
        ease: "power4.out"
    })

    main_tl.from("p", {
        x: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 1
    }, "-=1")


    function chec_time() {
        let d = new Date()

        console.log(d.getTime())
    }

    chec_time()

})
