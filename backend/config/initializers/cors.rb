require 'rack/cors'

Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins 'http://localhost:3001'
        resource '*', headers: :any, methods: [:get, :post, :patch, :put, :delete, :options, :head], credentials: true
    end

    allow do
        origins 'http://127.0.0.1:3001'
        resource '*', headers: :any, methods: [:get, :post, :patch, :put, :delete, :options, :head], credentials: true
    end
end