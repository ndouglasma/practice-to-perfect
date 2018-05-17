behave = QuestionCategory.create(name: 'Behavioral')
problem = QuestionCategory.create(name: 'Problem-solving')
motivate = QuestionCategory.create(name: 'Motivational')
tech = QuestionCategory.create(name: 'Technical Skills')
info = QuestionCategory.create(name: 'Informational')
surprise = QuestionCategory.create(name: 'Just Surprise Me')

behave00 = Question.create(body: "Talk about a time when you had to work closely with someone whose personality was very different from yours.", question_category: behave)
behave01 = Question.create(body: "Give me an example of a time you faced a conflict while working on a team. How did you handle that?", question_category: behave)
behave02 = Question.create(body: "Give an example of a goal you reached and tell me how you achieved it.", question_category: behave)
behave03 = Question.create(body: "Describe a stressful situation at work and how you handled it.", question_category: behave)
behave04 = Question.create(body: "Give an example of a goal you didn't meet and how you handled it.", question_category: behave)
behave05 = Question.create(body: "We all make mistakes we wish we could take back. Tell me about a time you wish you’d handled a situation differently with a colleague.", question_category: behave)
behave06 = Question.create(body: "Describe a time when you had to interact with a difficult client. What was the situation, and how did you handle it? If you haven't been in a client-facing role, tell me about a difficult business partner or fellow work colleague outside of your team.", question_category: behave)
behave07 = Question.create(body: "Tell me about a time you were under a lot of pressure. What was going on, and how did you get through it?", question_category: behave)
behave08 = Question.create(body: "Tell me about a time you failed. How did you deal with the situation?", question_category: behave)
behave09 = Question.create(body: "Tell me about a time you had to be very strategic in order to meet all your top priorities.", question_category: behave)
behave10 = Question.create(body: "Tell me about a time when you worked on a team based project when a member was not doing their share of the work.", question_category: behave)

Question.create(body: "Share with me your latest programming project, your biggest challenge with it, and how you solved it.", question_category: problem)
Question.create(body: "What steps do you take when you have to make an immediate decision without all the relevant information?", question_category: problem)
Question.create(body: "Give me a recent example of a valuable lesson you learned from a problem you faced at work.", question_category: problem)
Question.create(body: "What sources do you look to when you need to solve a complicated problem?", question_category: problem)
Question.create(body: "How do you deal with distracting coworkers who stand in the way of your progress?", question_category: problem)
Question.create(body: "How would you calculate the number of gas stations in the US?", question_category: problem)
Question.create(body: "Why is a tennis ball fuzzy?", question_category: problem)
Question.create(body: "A friend of yours built a bike-powered calculator.  How would you test to make sure it works properly?", question_category: problem)
Question.create(body: "I roll two fair dice, what is the probability that the sum is 9?", question_category: problem)
Question.create(body: "Why are manhole covers round?", question_category: problem)
Question.create(body: "How many times a day does a clock's hands overlap?", question_category: problem)

Question.create(body: "Tell me about a time you needed to get information from someone who wasn’t very responsive. What did you do?", question_category: motivate)
Question.create(body: "What was the best job you ever had? What were your responsibilities? Why do you consider it your best job? ", question_category: motivate)
Question.create(body: "What type of work environment to you work best in?", question_category: motivate)
Question.create(body: "Describe your ideal supervisor? Tell me about a time when you worked for someone like this? What qualities do you not prefer in a supervisor?", question_category: motivate)
Question.create(body: "Have you set a personal goal for yourself? Were you successful? Why?", question_category: motivate)
Question.create(body: "How would you define success at work or in your career?", question_category: motivate)
Question.create(body: "Are you a self starter? What motivates you?", question_category: motivate)
Question.create(body: "Give an example of a situation/project/time when you went above and beyond your responsibility to get the job done. ", question_category: motivate)
Question.create(body: "At times your work load may feel unmanageable. Describe a time when you recognized that you were unable to meet multiple deadlines. What did you do about it?", question_category: motivate)
Question.create(body: "Tell me about a time when you identified a new, unusual or different approach for addressing a problem or task.", question_category: motivate)
Question.create(body: "If you find yourself working with a team that is not motivated, how do you keep yourself motivated and motivate others?", question_category: motivate)

Question.create(body: "Tell me about the first job you’ve ever had. What did you do to learn the ropes?", question_category: tech)
Question.create(body: "Explain to me what is Git versus GitHub; and why would we use these.", question_category: tech)
Question.create(body: "In Ruby, how do instance variables differ from local variables?", question_category: tech)
Question.create(body: "In JavaScript what is a constructor?", question_category: tech)
Question.create(body: "Explain the MVC Model.", question_category: tech)
Question.create(body: "Give me an example why we need asynchronous behavior.", question_category: tech)
Question.create(body: "What is a SQL join?", question_category: tech)
Question.create(body: "What does it mean when we say HTTP is stateless and what are the pros/cons of this?", question_category: tech)
Question.create(body: "You’ve just been assigned to a project involving a new technology. How would you get started?", question_category: tech)
Question.create(body: "Do you write code outside of work?", question_category: tech)
Question.create(body: "What is an API?", question_category: tech)

Question.create(body: "Describe a long-term project that you managed. How did you keep everything moving along in a timely manner?", question_category: info)
Question.create(body: "Tell me about a successful presentation you gave and why you think it was a hit.", question_category: info)
Question.create(body: "Tell me about your proudest professional accomplishment.", question_category: info)
Question.create(body: "Looking back at your work experience, what would you say has been a common theme amongst them?", question_category: info)
Question.create(body: "What attracted you to this job position and how do you see yourself as a good fit?", question_category: info)
Question.create(body: "How would you rate your technical programming skills?", question_category: info)
Question.create(body: "Prior to Launch Academy where were you working and what encouraged you to move on?", question_category: info)
Question.create(body: "I understand Launch Academy requires you to complete a group project.  Tell me what the project was and your specific contribution.", question_category: info)
Question.create(body: "Why are you interested in working for our company?", question_category: info)
Question.create(body: "I see you went to Launch Academy.  Why did you select Launch and what did you love the most?", question_category: info)
Question.create(body: "If you went to college, what was your major and why did you select it?", question_category: info)
