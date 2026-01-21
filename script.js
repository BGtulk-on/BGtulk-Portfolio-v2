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

    gsap.registerPlugin(ScrollTrigger)



    var expBoxes = document.querySelectorAll(".exp-box")
    var isMobile = window.innerWidth < 768

    expBoxes.forEach(function (box, idx) {
        var dir = box.dataset.dir
        var xVal = dir === "left" ? -180 : 180

        if (isMobile) xVal = dir === "left" ? -80 : 80

        var dateEl = box.querySelector(".exp-date")

        if (isMobile) {
            gsap.set(box, { x: xVal })

            gsap.to(box, {
                keyframes: [
                    { x: 0, ease: "power2.out" },
                    { x: xVal, ease: "power2.in" }
                ],
                scrollTrigger: {
                    trigger: box,
                    start: "top 85%",
                    end: "top -15%",
                    scrub: 1
                }
            })

            if (dateEl) {
                gsap.to(dateEl, {
                    keyframes: [
                        { opacity: 1, ease: "none" },
                        { opacity: 1, ease: "none" },
                        { opacity: 0, ease: "power2.in" }
                    ],
                    scrollTrigger: {
                        trigger: box,
                        start: "top 85%",
                        end: "top -15%",
                        scrub: 1
                    }
                })
            }

        } else {
            gsap.to(box, {
                keyframes: [
                    { x: xVal, ease: "power2.out" },
                    { x: 0, ease: "power2.in" }
                ],
                scrollTrigger: {
                    trigger: box,
                    start: "top 80%",
                    end: "top -20%",
                    scrub: 1
                }
            })

            if (dateEl) {
                gsap.to(dateEl, {
                    keyframes: [
                        { opacity: 0, ease: "none" },
                        { opacity: 1, ease: "power2.out" },
                        { opacity: 1, ease: "none" },
                        { opacity: 0, ease: "power2.in" }
                    ],
                    scrollTrigger: {
                        trigger: box,
                        start: "top 80%",
                        end: "top -20%",
                        scrub: 1
                    }
                })
            }
        }
    })


    var projectCards = document.querySelectorAll(".project-card")

    projectCards.forEach(function (card, idx) {
        var xStart = idx % 2 === 0 ? -50 : 50
        var rotStart = idx % 2 === 0 ? -5 : 5

        gsap.set(card, { opacity: 0, x: xStart, rotateZ: rotStart, scale: 0.9 })

        ScrollTrigger.create({
            trigger: card,
            start: "top 85%",
            onEnter: function () {
                gsap.to(card, {
                    opacity: 1,
                    x: 0,
                    rotateZ: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: "back.out(1.2)"
                })
            },
            once: true
        })
    })

    function chec_time() {
        let d = new Date()

        console.log(d.getTime())
    }

    chec_time()


    async function fetchGitHubStats() {
        var username = "BGtulk-on"

        try {
            var reposRes = await fetch("https://api.github.com/users/" + username + "/repos?per_page=100")
            var repos = await reposRes.json()

            var totalSizeKB = 0
            var langCounts = {}

            if (Array.isArray(repos)) {
                repos.forEach(repo => {
                    totalSizeKB += repo.size

                    if (repo.language) {
                        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1
                    }
                })
            }
            var estimatedLOC = Math.round(totalSizeKB * 10)
            document.getElementById("github-lines").textContent = estimatedLOC.toLocaleString()

            var topLang = "N/A"
            var maxCount = 0
            for (var lang in langCounts) {
                if (langCounts[lang] > maxCount) {
                    maxCount = langCounts[lang]
                    topLang = lang
                }
            }
            document.getElementById("github-top-lang").textContent = topLang


            var contribRes = await fetch("https://github-contributions-api.jogruber.de/v4/" + username)

            if (!contribRes.ok) throw new Error("Contributions not found")

            var contribData = await contribRes.json()

            var totalContributions = 0
            if (contribData.total) {
                Object.values(contribData.total).forEach(yearTotal => {
                    totalContributions += yearTotal
                })
            } else {
                totalContributions = "100+"
            }

            document.getElementById("github-commits").textContent = totalContributions

        } catch (err) {
            console.error("GitHub Fetch Error:", err)
            document.getElementById("github-commits").textContent = "-"
            document.getElementById("github-lines").textContent = "-"
        }
    }

    fetchGitHubStats()
})
