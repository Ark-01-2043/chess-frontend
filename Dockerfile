FROM node:18-alpine

COPY . .
RUN NO_EMAIL_AUTOFILL=true node setup

CMD ["npm", "start"]