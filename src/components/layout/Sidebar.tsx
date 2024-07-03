import { Layout, Menu } from "antd";
import { sidebarRouteGenerator } from "../../utils/sidebarRouteGenerator";
import { adminPaths } from "../../routes/admin.route";
import { facultyPaths } from "../../routes/faculty.route";
import { studentPaths } from "../../routes/student.route";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const role = "faculty";
  let sidebaritems;

  switch (role) {
    case userRole.ADMIN:
      sidebaritems = sidebarRouteGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebaritems = sidebarRouteGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebaritems = sidebarRouteGenerator(studentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          color: "white",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="demo-logo-vertical"
      >
        <h2>PH University</h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebaritems}
      />
    </Sider>
  );
};

export default Sidebar;
