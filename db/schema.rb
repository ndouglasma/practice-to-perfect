# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_05_12_123141) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "mock_interviews", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "selected_num_questions", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_mock_interviews_on_user_id"
  end

  create_table "question_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_question_categories_on_name", unique: true
  end

  create_table "questions", force: :cascade do |t|
    t.bigint "question_category_id", null: false
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["body"], name: "index_questions_on_body", unique: true
    t.index ["question_category_id"], name: "index_questions_on_question_category_id"
  end

  create_table "user_responses", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "mock_interview_id", null: false
    t.bigint "question_id", null: false
    t.string "audio", null: false
    t.integer "audio_size"
    t.string "audio_type"
    t.text "aws_s3_file_uri"
    t.time "audio_start_time"
    t.time "audio_stop_time"
    t.string "aws_transcribe_job_name"
    t.text "aws_transcribe_transcript_file_uri"
    t.time "aws_transcribe_creation_time"
    t.time "aws_transcribe_completion_time"
    t.string "aws_transcribe_job_status", default: "NOT_STARTED"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["mock_interview_id"], name: "index_user_responses_on_mock_interview_id"
    t.index ["question_id"], name: "index_user_responses_on_question_id"
    t.index ["user_id"], name: "index_user_responses_on_user_id"
  end

  create_table "user_selected_categories", force: :cascade do |t|
    t.bigint "mock_interview_id", null: false
    t.bigint "question_category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["mock_interview_id", "question_category_id"], name: "index_select_categories_on_mock_interview_and_question_category", unique: true
    t.index ["mock_interview_id"], name: "index_user_selected_categories_on_mock_interview_id"
    t.index ["question_category_id"], name: "index_user_selected_categories_on_question_category_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "github"
    t.integer "github_id", null: false
    t.string "github_login", null: false
    t.string "github_avatar_url", null: false
    t.string "github_name"
    t.integer "sign_in_count", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["github_id"], name: "index_users_on_github_id", unique: true
    t.index ["github_login"], name: "index_users_on_github_login", unique: true
  end

end
