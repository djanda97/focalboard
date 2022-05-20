// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

describe('Manage groups', () => {
    beforeEach(() => {
        cy.apiInitServer()
        cy.apiResetBoards()
        cy.apiGetMe().then((userID) => cy.apiSkipTour(userID))
        localStorage.setItem('welcomePageViewed', 'true')
        localStorage.setItem('language', 'en')
    })

    it('MM-T4284 Adding a group', () => {
        // Visit a page and create new empty board
        cy.visit('/')
        cy.uiCreateEmptyBoard()

        cy.contains('+ Add a group').click({force: true})
        cy.get('.KanbanColumnHeader .Editable[value=\'New group\']').should('exist')

        cy.get('.KanbanColumnHeader .Editable[value=\'New group\']').
            clear().
            type('Group 1').
            blur()
        cy.get('.KanbanColumnHeader .Editable[value=\'Group 1\']').should('exist')
    })

    it('MM-T4285 Adding group color', () => {
        // Visit a page and create new empty board
        cy.visit('/')
        cy.uiCreateEmptyBoard()

        cy.contains('+ Add a group').click({force: true})
        cy.get('.KanbanColumnHeader .Editable[value=\'New group\']').should('exist')

        cy.get('.KanbanColumnHeader').last().within(() => {
            cy.get('.icon-dots-horizontal').click({force: true})
            cy.get('.menu-options').should('exist').within(() => {
                cy.contains('Hide').should('exist')
                cy.contains('Delete').should('exist')

                // Some colours
                cy.contains('Brown').should('exist')
                cy.contains('Gray').should('exist')
                cy.contains('Orange').should('exist')

                // Click on green
                cy.contains('Green').should('be.visible').click().wait(1000) // eslint-disable-line cypress/no-unnecessary-waiting
            })
        })

        cy.get('.KanbanColumnHeader').last().within(() => {
            cy.get('.Label.propColorGreen').should('exist')
        })
    })

    it('MM-T4287 Hiding/unhiding a group', () => {
        // Step 1: Create an empty board and add a group

        // Step 2: Click on the three dots next to "Group 1"
        // Expected: Dropdown opens with Hide, Delete and color options

        // Step 3: Click on "Hide"
        // Expected: "Group 1" is now shown under "Hiden columns" with the card count (3) next to it and the cards hidden

        // Step 4: Click "Group 1", then click "Show" in the dropdown
        // Expected: Group 1 is restored with all the cards listed below it

    })
})
