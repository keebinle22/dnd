package com.main.model;

public class Role {

    private int roleID;
    private RolesEnum type;
    private String description;

    public Role(){};

    public Role(int roleID, RolesEnum type, String description) {
        this.roleID = roleID;
        this.type = type;
        this.description = description;
    }

    public int getRoleID() {
        return roleID;
    }

    public void setRoleID(int roleID) {
        this.roleID = roleID;
    }

    public RolesEnum getType() {
        return type;
    }

    public void setType(String type) {
        this.type = RolesEnum.valueOf(type);
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
