behave = QuestionCategory.create(name: 'Behavioral')
problem = QuestionCategory.create(name: 'Problem-solving')
motivate = QuestionCategory.create(name: 'Motivational')
tech = QuestionCategory.create(name: 'Technical Skills')
info = QuestionCategory.create(name: 'Informational')

Question.create(body: "Talk about a time when you had to work closely with someone whose personality was very different from yours.", question_category: behave)
Question.create(body: "Give me an example of a time you faced a conflict while working on a team. How did you handle that?", question_category: behave)
Question.create(body: "Describe a time when you struggled to build a relationship with someone important. How did you eventually overcome that?", question_category: problem)
Question.create(body: "We all make mistakes we wish we could take back. Tell me about a time you wish you’d handled a situation differently with a colleague.", question_category: problem)
Question.create(body: "Tell me about a time you needed to get information from someone who wasn’t very responsive. What did you do?", question_category: motivate)
Question.create(body: "Tell me about a time you were under a lot of pressure. What was going on, and how did you get through it?", question_category: motivate)
Question.create(body: "Tell me about the first job you’ve ever had. What did you do to learn the ropes?", question_category: tech)
Question.create(body: "Tell me about a time you failed. How did you deal with the situation?", question_category: tech)
Question.create(body: "Describe a long-term project that you managed. How did you keep everything moving along in a timely manner?", question_category: info)
Question.create(body: "Tell me about a successful presentation you gave and why you think it was a hit.", question_category: info)
Question.create(body: "Tell me about your proudest professional accomplishment.", question_category: info)
