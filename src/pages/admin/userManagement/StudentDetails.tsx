import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.Api";
import { Col, Divider, Flex, Row } from "antd";

const StudentDetails = () => {
  const params = useParams();
  const { studentId } = params;
  const { data, isLoading } = useGetSingleStudentQuery(studentId);

  const student = data?.data;
  

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  console.log(student);

  return (
    <Row>
      <Col span={24}>
        <div style={{ marginBottom: "3rem" }}>
          <Divider>Personal Info</Divider>

          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "end",
              justifyContent: "end",
              flexDirection: "column",
              marginBottom: "2rem",
            }}
          >
            <img
              style={{ width: "6rem" }}
              src={student?.profileImg}
              alt="profileImg"
            />
            <h4>{student?.fullName.slice(0, 14)}</h4>
          </div>

          <Row style={{ marginBottom: "1rem" }}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>First Name: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {" "}
                  {student?.name?.firstName}
                </h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Middle Name: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {" "}
                  {student?.name?.middleName}
                </h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Middle Name: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {" "}
                  {student?.name?.lastName}
                </h4>
              </Flex>
            </Col>
          </Row>

          <Row style={{ marginBottom: "1rem" }}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Roll No: </span>
                <h4 style={{ textTransform: "capitalize" }}> {student?.id}</h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Middle Name: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {" "}
                  {student?.gender}
                </h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Middle Name: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {" "}
                  {student?.dateOfBirth}
                </h4>
              </Flex>
            </Col>
          </Row>

          <Row style={{ marginBottom: "1rem" }}>
            <Col span={12}>
              <Flex gap={8}>
                <span>Blood Group: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {" "}
                  {student?.bloodGroup}
                </h4>
              </Flex>
            </Col>
          </Row>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <Divider>Contact Info</Divider>

          <Row style={{ marginBottom: "1rem" }}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Phone No: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.contactNo}
                </h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Emergency Contact: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {" "}
                  {student?.emergencyContact}
                </h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Parent Address: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {" "}
                  {student?.presentAddress}
                </h4>
              </Flex>
            </Col>
          </Row>

          <Row style={{ marginBottom: "1rem" }}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Permanent Address: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.permanentAddress}
                </h4>
              </Flex>
            </Col>
          </Row>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <Divider>Gurdian Info</Divider>

          <Row style={{ marginBottom: "1rem" }}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Father Name: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.guardian?.fatherName}
                </h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Mother Name: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.guardian?.motherName}
                </h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Father Contact No: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.guardian?.fatherContactNo}
                </h4>
              </Flex>
            </Col>
          </Row>

          <Row style={{ marginBottom: "1rem" }}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Father Contact No: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.guardian?.fatherContactNo}
                </h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Mother Contact No: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.guardian?.motherContactNo}
                </h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Mother Occupaton: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.guardian?.motherOccupation}
                </h4>
              </Flex>
            </Col>
          </Row>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <Divider>Local Gurdian Info</Divider>

          <Row style={{ marginBottom: "1rem" }}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Name: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.localGuardian?.name}
                </h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Occupaton: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.localGuardian?.occupation}
                </h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Contact: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.localGuardian?.contact}
                </h4>
              </Flex>
            </Col>
          </Row>
          <Row style={{ marginBottom: "1rem" }}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Address: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.localGuardian?.address}
                </h4>
              </Flex>
            </Col>
          </Row>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <Divider>Admission Semester</Divider>

          <Row style={{ marginBottom: "1rem" }}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Name: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.admissionSemester?.name}
                </h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Code: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.admissionSemester?.code}
                </h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Year: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.admissionSemester?.year}
                </h4>
              </Flex>
            </Col>
          </Row>
          <Row style={{ marginBottom: "1rem" }}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Start Month: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.admissionSemester?.startMonth}
                </h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>End Month: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.admissionSemester?.endMonth}
                </h4>
              </Flex>
            </Col>
          </Row>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <Divider>Academic Department</Divider>

          <Row style={{ marginBottom: "1rem" }}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Name: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.academicDepartment?.name}
                </h4>
              </Flex>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Flex gap={8}>
                <span>Faculty Name: </span>
                <h4 style={{ textTransform: "capitalize" }}>
                  {student?.academicDepartment?.academicFaculty?.name}
                </h4>
              </Flex>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default StudentDetails;
