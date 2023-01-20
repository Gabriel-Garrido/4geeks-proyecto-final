"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Bank_account,Transaction, Change
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

# User endpoints

@api.route('/get_all_users/', methods=['GET'])
def get_all_users():
    users = User.query.all()
    if (users == []):
        return "users not found", 404
    else:
        users = list(map(lambda x: x.serialize(),users))
        return jsonify(users), 200

@api.route('/get_user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    for user in user_temp:
        if user["id"] == user_id:
            return jsonify(user), 200
    return "user not found", 404

@api.route('/add_user', methods=['POST'])
def add_user():
    req_Json = request.get_json()

    user = User(req_Json["rut"], req_Json["email"], req_Json["password"], req_Json["validate_status"], req_Json["first_name"], req_Json["last_name"], req_Json["phone"], req_Json["birthdate"], req_Json["nationality"], req_Json["ocupation"], req_Json["monthly_income"], req_Json["particular_address"], req_Json["department"])
    db.session.add(user)
    db.session.commit()
    return "user " + req_Json["email"] + " was created", 201

@api.route('/edit_user/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    req_Json = request.get_json()
    for i, user in enumerate(user_temp):
        if user["id"] == user_id:
            user_temp[i] = req_Json
            user_temp[i]["id"] = user_id
            return jsonify(user_temp), 200
    return "user not found", 404

@api.route('delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    for i, user in enumerate(user_temp):
        if user["id"] == user_id:
            del user_temp[i]
            return jsonify(user_temp), 200
    return "user not found", 404 


# Change endpoints
#cambios realizados 19ene en get all y post

@api.route('/get_all_changes/', methods=['GET'])
def get_all_changes():
    changes = Change.query.all()
    if(changes == []):
        return "change rates not found", 404
    else:
        return jsonify(changes), 200

@api.route('/get_change/<int:change_id>', methods=['GET'])
def get_change(change_id):
    for change in change_temp:
        if change["id"] == change_id:
            return jsonify(change), 200
        else:
            return "change rate not found"

@api.route('add_change', methods=['POST'])
def add_change():
    req_Json = request.get_json()


    change = Change(req_Json["origin_exchange"], "destination_exchange", "exchange_rate", "transactions")
    db.session.add(change)
    db.session.commit()
    return "change was created", 201



@api.route('edit_change/<int:change_id>', methods=['PUT'])
def edit_change(change_id):
    req_Json = request.get_json()
    for i, change in enumerate(change_temp):
        if change["id"] == change_id:
            change_temp[i] = req_Json
            change_temp[i]["id"] = change_id
            return jsonify(change_temp), 200
    return "change rate not found", 404

@api.route('delete_change/<int:change_id>', methods=['DELETE'])
def delete_change(change_id):
    for i, change in enumerate(change_temp):
        if change["id"] == change_id:
            del change_temp[i]
            return jsonify(change_temp), 200
        
    return "change rate not found", 404
    


# Bank_account endpoints


@api.route('/get_all_bank_accounts/', methods=['GET'])
def get_all_bank_account():
    bank_accounts = Bank_account.query.all()
    if(bank_accounts == []):
        return "bank accounts not found", 404
    else:
        bank_accounts = list(map(lambda x: x.serialize(), bank_accounts))
        return jsonify(bank_accounts), 200

@api.route('/get_bank_account/<int:bank_account_id>', methods=['GET'])
def get_bank_account(bank_account_id):
    for bank_account in bank_account_temp:
        if bank_account["id"] == bank_account_id:
            return jsonify(bank_account), 200
        else:
            return "bank account not found", 404

   #cambios realizados 19ene         

@api.route('add_bank_account', methods=['POST'])
def add_bank_account():
    req_Json = request.get_json()


    bank_account = Bank_account(req_Json["user_id"], req_Json["country"], req_Json["account_number"], req_Json["bank"], req_Json["account_holder"], req_Json["document_type"], req_Json["document_id"], req_Json["transactions"])
    db.session.add(bank_account)
    db.session.commit()
    return "bank account created", 201
    

@api.route('edit_bank_account/<int:bank_account_id>', methods=['PUT'])
def edit_bank_account(bank_account_id):
    req_Json = request.get_json()
    for i, bank_account in enumerate(bank_account_temp):
        if bank_account["id"] == bank_account_id:
            bank_account_temp[i] = req_Json
            bank_account_temp[i]["id"] = bank_account_id
            return jsonify(bank_account_temp), 200
    return "bank account not found", 404


@api.route('delete_bank_account/<int:bank_account_id>', methods=['DELETE'])
def delete_bank_account(bank_account_id):
    for i, bank_account in enumerate(bank_account_temp):
        if bank_account["id"] == bank_account_id:
            del bank_account_temp[i]
            return jsonify(bank_account_temp), 200
    return "bank account not found", 404


# Transaction endpoints

@api.route('/get_all_transactions/', methods=['GET'])
    # agregar paginacion
def get_all_transaction():
    transactions = Transaction.query.all()
    if (transactions == []):
        return "transactions not found", 404
    else:
        transactions = list(map(lambda x: x.serialize(),transactions))
        return jsonify(transactions), 200

@api.route('/get_transaction/<int:transaction_id>', methods=['GET'])
def get_transaction(transaction_id):
    for transaction in transaction_temp:
        if transaction["id"] == transaction_id:
            return jsonify(transaction), 200
        else:
            return "transaction not found", 404


@api.route('add_transaction/<int:transaction_id>', methods=['POST'])
def add_transaction(transaction_id):
   id = 9
   req_Json = request.get_json()
   req_Json["id"] = id
   transaction_temp.append(req_Json)

@api.route('edit_transaction/<int:transaction_id>', methods=['PUT'])
def edit_transaction(transaction_id):
    req_Json = request.get_json()
    transaction_temp[transaction_id] = req_Json
    return jsonify(transaction_temp), 200

@api.route('delete_transaction/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    req_Json = request.get_json()
    del transaction_temp[transaction_id]
    return jsonify(transaction_temp), 200

    return jsonify(response_body), 200


@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    found_user=None
    for i, user in enumerate(user_temp):
        if user["email"] == email:
            found_user=user
    if found_user is  None:
        return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identity=found_user["id"])
    return jsonify({ "token": access_token, "user_id": found_user["id"] })

