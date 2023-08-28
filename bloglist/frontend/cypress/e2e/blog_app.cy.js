describe("Blog", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    cy.visit("http://localhost:3001")
    const user = {
      name: "Austin Powers",
      username: "apowers",
      password: "groovy",
    }
    cy.request("POST", "http://localhost:3001/api/users", user)
    cy.visit("http://localhost:3001")
  })

  it("Login for is shown", function () {
    cy.contains("Log in to application")
    cy.get("#username-input").should("be.visible")
    cy.get("#password-input").should("be.visible")
    cy.get("#login-button").should("be.visible")
  })

  describe("Login", function () {
    it("Succesfull login with right credentials", function () {
      cy.get("#username-input").type("apowers")
      cy.get("#password-input").type("groovy")
      cy.get("#login-button").click()
      cy.contains("Austin Powers is logged in")
    })

    it("Login fails with wrong credentials", function () {
      cy.get("#username-input").type("drevil")
      cy.get("#password-input").type("onebilliondollars")
      cy.get("#login-button").click()
      cy.contains("Incorrect username or password")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      // Lisätään blogeja testitietokantaan
      // cy.request('POST', 'http://localhost:3001/api/testing/addblogs')

      // cy.get('#username-input').type('apowers')
      // cy.get('#password-input').type('groovy')
      // cy.get('#login-button').click()

      cy.request("POST", "http://localhost:3001/api/login", {
        username: "apowers",
        password: "groovy",
      }).then((response) => {
        localStorage.setItem("loggedBlogUser", JSON.stringify(response.body))
        cy.visit("http://localhost:3001")
      })
      cy.contains("Add blog").click()
      cy.get("#title-input").type("Cypress test blog")
      cy.get("#author-input").type("Cypress Hill")
      cy.get("#url-input").type("https://www.legimateurl.com")
      cy.contains("Submit").click()
    })

    it("A blog can be created", function () {
      cy.contains('Blog "Cypress test blog" by Cypress Hill added')
      cy.contains("Cypress test blog Cypress Hill")
    })

    it("Blog can be liked", function () {
      cy.contains("Cypress test blog Cypress Hill").contains("view").click()
      cy.contains("like").click()
      cy.contains("Likes: 1")
    })

    it("Blog entry creator can remove entry", function () {
      cy.contains("Cypress test blog Cypress Hill").contains("view").click()
      cy.contains("Remove").click()

      cy.contains("Cypress test blog by Cypress Hill has been removed")
      cy.get("html").should("not.contain", "Cypress test blog Cypress Hill")
    })

    it("User can only remove blogs they have added themselves", function () {
      //LOGGAA ULOS JA TEE UUSI KÄYTTÄJÄ LOGGAA SISÄÄN KATSO LÖYTYYKÖ REMOVE BUTTONIA
      cy.contains("Logout").click()
      localStorage.removeItem("loggedBlogUser")
      //Tehdään uusi käyttäjä
      const user = {
        name: "Dr. Evil",
        username: "drevil",
        password: "onebilliondollars",
      }
      cy.request("POST", "http://localhost:3001/api/users", user)
      //Kirjaudu sisään toisena käyttäjänä
      cy.get("#username-input").type("drevil")
      cy.get("#password-input").type("onebilliondollars")
      cy.get("#login-button").click()
      //Tarkista että blogista ei löydy remove nappia
      cy.contains("Cypress test blog Cypress Hill").contains("view").click()
      cy.get("html").should("not.contain", "Remove")
    })

    it("Blog list is ordered by likes", function () {
      //Testiblogit
      // {
      //   title: "React patterns",
      //   author: "Michael Chan",
      //   url: "https://reactpatterns.com/",
      //   likes: 7,
      // },
      // {
      //   title: "Go To Statement Considered Harmful",
      //   author: "Edsger W. Dijkstra",
      //   url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      //   likes: 5,
      // },
      // {
      //   title: "Canonical string reduction",
      //   author: "Edsger W. Dijkstra",
      //   url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      //   likes: 12,
      // }
      //
      // Lisätään blogeja testitietokantaan ja testataan että lisättyjen blogien järjestys on oikea, ja cypressin kautta lisätty blogi
      //jolla ei ole likeja menee viimeiseksi
      cy.request("POST", "http://localhost:3001/api/testing/addblogs")
      cy.get("html")
      cy.get("#blog-div-for-testing>div")
        .eq(0)
        .should("contain", "Canonical string reduction Edsger W. Dijkstra")
      cy.get("#blog-div-for-testing>div")
        .eq(1)
        .should("contain", "React patterns Michael Chan")
      cy.get("#blog-div-for-testing>div")
        .eq(2)
        .should(
          "contain",
          "Go To Statement Considered Harmful Edsger W. Dijkstra",
        )
      cy.get("#blog-div-for-testing>div")
        .eq(3)
        .should("contain", "Cypress test blog Cypress Hill")
    })
  })
})
