// Load all the controllers within this directory and all subdirectories.
// Controller files must be named *_controller.js.

import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"
import StimulusReflex from 'stimulus_reflex'
import consumer from '../channels/consumer'
import controller from '../controllers/application_controller'

window.Stimulus = Application.start()
const context = require.context("controllers", true, /_controller\.js$/)
// const context = require.context("./controllers", true, /\.js$/)
Stimulus.load(definitionsFromContext(context))
StimulusReflex.initialize(application, { consumer, controller, isolate: true })
StimulusReflex.debug = process.env.RAILS_ENV === 'development'
